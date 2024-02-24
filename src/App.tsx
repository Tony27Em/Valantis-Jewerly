import { useEffect, useState } from "react";
import { Card, Table, Pagination } from "antd";
import { ItemType } from './types';
import { TABLE_COLUMNS } from "./config/table-columns";
import FilterForm from "./components/FilterForm";
import ApiService from "./services/apiService";

const PAGE_SIZE = 50;

function App() {
  const [ids, setIds] = useState<string[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [brandsList, setBrandsList] = useState<Record<string, string>[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, string | number>>({});

  async function getInitialData() {  
    try {
      const { data } = await ApiService.getIds();      
      const { data: fieldsData } = await ApiService.getFields();
      const result = fieldsData.result.filter(item => item);
      const uniqueBrands = [...new Set(result)].sort().map(item => ({ value: item, label: item }));
      
      setIds(data.result);
      setBrandsList(uniqueBrands);
    } catch (err) {
      console.log('Something went wrong with getting initial data', err);
    }
  }

  async function getFilteredItems() {
    try {
      const { data } = await ApiService.getFilteredItems(searchParams);
      setIds(data.result);
      setCurrentPage(1);
    } catch (err) {
      console.log('Something went wrong with getting filtered items', err);
    }
  }

  function handleSearchParams(field: string, value: string) { 
    setSearchParams({ [field]: value === '' ? '' : isNaN(+value) ? value : +value });
  }

  async function resetSearchParams() {
    setSearchParams({});
    getInitialData();
  }

  useEffect(() => {
    getInitialData();
  }, [])

  useEffect(() => {
    (async function getItemsData() {
      if (!ids.length) {
        setItems([]);
        return;
      };

      setLoading(true);
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;

      try {
        const { data } = await ApiService.getItems(ids.slice(startIndex, endIndex));
        const uniqueItemsSet = new Set(data.result.map((item: ItemType) => item?.id));
        const uniqueItems = Array.from(uniqueItemsSet, id => data.result.find((item: ItemType) => item.id === id));
        setItems(uniqueItems as ItemType[]);
      } catch (err) {
        console.log('Something went wrong with getting items', err);
      }

      setLoading(false);
    })()
  }, [ids, currentPage])

  return (
    <>
      <Card
        title='Valantis Jewerly'
        styles={{
          body: {
            padding: 0
          }
        }}
      >
        <FilterForm
          loading={loading}
          searchParams={searchParams}
          getFilteredItems={getFilteredItems}
          handleSearchParams={handleSearchParams}
          resetSearchParams={resetSearchParams}
          brandsList={brandsList}
        />

        <Table
          rowKey='id'
          bordered={true}
          dataSource={items}
          columns={TABLE_COLUMNS}
          loading={loading}
          pagination={false}
          locale={{ emptyText: (
            <span style={{ fontWeight: 700 }}>Ничего не найдено</span>
          )}}
        />

        <Pagination
          total={ids.length}
          current={currentPage}
          pageSize={PAGE_SIZE}
          showSizeChanger={false}
          hideOnSinglePage={true}
          disabled={loading}
          style={{ textAlign: 'center', padding: 20 }}
          onChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </>
  )
}

export default App
