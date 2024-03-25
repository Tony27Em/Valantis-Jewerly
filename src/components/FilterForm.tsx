import { CSSProperties, FC, useState } from "react";
import { Form, Input, Button, Select, Popover } from "antd";
import { FormType } from "../types";

const formStyles: CSSProperties = {
  width: '20%',
  minWidth: 300,
  margin: 'auto',
  paddingBlock: 25,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 20,
}

const note = (
  <>
    <p>Я заметил, что поиск-фильтр немного необычно работает при передаче более одного параметра в params</p>
    <p>Результат приходит, но поиск осуществляется только по первому ключ-значению в объекте params, что странно</p>
    <p>Поэтому реализовал поиск по одному полю за раз</p>
    <p>Возможно я не прав, пожалуйста дайте знать</p>
  </>
)

const FilterForm: FC<FormType> = ({ loading, searchParams, getFilteredItems, handleSearchParams, resetSearchParams, brandsList }) => {
  const { product, price, brand } = searchParams;
  const [disabled, setDisabled] = useState<boolean>(true);

  function handleSearch() {
    setDisabled(false);
    getFilteredItems();
  }

  function handleReset() {
    setDisabled(true);
    resetSearchParams();
  }

  return (
    <Form
      style={formStyles}
      disabled={loading}
    >
      <Input
        type="text"
        value={product}
        placeholder="Поиск по названию"
        onChange={(e) => handleSearchParams('product', e.target.value)}
      />

      <Input
        type='number'
        value={price}
        placeholder="Поиск по цене"
        onChange={(e) => handleSearchParams('price', e.target.value)}
      />

      <Select
        value={brand as string || 'Выберите бренд'}
        options={brandsList}
        style={{ width: '100%' }}
        onChange={(value) => handleSearchParams('brand', value)}
      />

      <div style={{ display: 'flex', gap: 20 }}>
        <Button
          type="primary"
          // disabled={!product && !price && !brand}
          onClick={() => handleSearch()}
        >
          Найти
        </Button>

        <Button
          type="primary"
          danger
          disabled={loading || disabled}
          onClick={() => handleReset()}
        >
          Сбросить
        </Button>

        <Popover content={note} title="Примечание" placement="bottom">
          <Button type="dashed">Примечание</Button>
        </Popover>
      </div>
    </Form>
  )
}

export default FilterForm;