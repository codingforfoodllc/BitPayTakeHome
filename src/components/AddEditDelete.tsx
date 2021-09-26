import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import numberFormatToUSD from "../common/formatToUSCurrency";
import getExchangeRate from "../common/getExchangeRate";
import { AppContext } from "../context/AppContext";
import { RowData } from "../domain/RowData";

type AddEditDeleteProps = {
  addToTable: (rowData: RowData) => void;
  editTableValue: (rowData: RowData) => void;
  deleteTableValue: (rowData: RowData) => void;
};

const AddEditDelete = ({
  addToTable,
  editTableValue,
  deleteTableValue,
}: AddEditDeleteProps) => {
  const { onEditTableRow, editingRow } = useContext(AppContext);

  const { register, handleSubmit, reset, formState } = useForm<RowData>({
    mode: "onBlur",
  });
  const { errors } = formState;

  useEffect(() => {
    console.log("useeffect addedit");
    if (editingRow) {
      reset(editingRow);
    }
  }, [editingRow, reset]);

  const onSubmit = async (data: RowData) => {
    const exchangeRateResult = await getExchangeRate(data.Currency);
    data.PriceUSD = numberFormatToUSD(exchangeRateResult.rate);

    if (editingRow) {
      editTableValue(data);
    } else {
      addToTable(data);
    }
    //todo:is this needed?
    if (onEditTableRow) {
      onEditTableRow(null);
    }

    reset();
  };

  const onDelete = () => {
    if (editingRow) {
      deleteTableValue(editingRow);
    }
  };

  return (
    <Container>
      {/* </motion.main> */}
      <ContentContainer>
        <Header
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          exit={{ x: "100vw", opacity: 0 }}
          transition={{ duration: 0.75, type: "easeout" }}
        >
          {editingRow ? "Editing" : "Adding"}
        </Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label htmlFor="MerchantName">Merchant Name</Label>
            <Input
              type="text"
              placeholder="Merchant Name"
              id="MerchantName"
              errored={errors["MerchantName"]?.type === "required"}
              {...register("MerchantName", { required: true })}
            />
            {errors?.MerchantName?.type === "required" && (
              <Error>Merchant Name is required.</Error>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="Item">Item</Label>
            <Input
              type="text"
              id="Item"
              errored={errors?.Item?.type === "required"}
              {...register("Item", { required: true })}
            />
            {errors?.Item?.type === "required" && (
              <Error>Item is required.</Error>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="CryptoAmount">Amount (Crypto)</Label>
            <Input
              type="text"
              id="CryptoAmount"
              errored={
                errors?.CryptoAmount?.type === "required" ||
                (errors?.CryptoAmount?.message as string)?.length > 0
              }
              {...register("CryptoAmount", {
                required: true,
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,8})?$/i,
                  message:
                    "Must be a number and no more than 8 decimal places.",
                },
              })}
            />
            {errors?.Item?.type === "required" && (
              <Error>Amount (Crypto) is required.</Error>
            )}
            {formState.errors.CryptoAmount?.message && (
              <Error>{formState.errors.CryptoAmount?.message}</Error>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="Currency">Currency</Label>
            <Select
              {...register("Currency", {
                required: true,
              })}
            >
              <option value=""></option>
              <option value="BTC">BTC</option>
              <option value="BCH">BCH</option>
              <option value="ETH">ETH</option>
            </Select>

            {errors?.Currency?.type === "required" && (
              <Error>Currency is required.</Error>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="PriceUSD">Price/crypto (USD)</Label>
            <Input
              id="PriceUSD"
              errored={errors?.PriceUSD?.type === "required"}
              {...register("PriceUSD", { required: true })}
            />
            {errors?.Item?.type === "required" && (
              <Error>Price/crypto(USD) is required.</Error>
            )}
          </InputContainer>
          <InputContainer className="field">
            <Label htmlFor="USDAmount">Amount(USD)</Label>
            <Input
              id="USDAmount"
              errored={errors?.USDAmount?.type === "required"}
              {...register("USDAmount", { required: true })}
            />
            {errors?.USDAmount?.type === "required" && (
              <Error>Amount(USD) is required.</Error>
            )}
          </InputContainer>
          <button type="submit">Save</button>
          {editingRow && <button onClick={(e) => onDelete()}>Delete</button>}
        </form>
      </ContentContainer>
    </Container>
  );
};

const Header = styled(motion.div)`
  color: gray;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  margin-bottom: 1rem; ;
`;

const Container = styled.div`
  /* background-color: pink; */
  height: 100vh;
`;

const ContentContainer = styled.div`
  background: white;
  /* margin-top: 2.5rem; */
  margin-left: 2.5rem;
  margin-right: 2.5rem;
  /* margin-top: -1rem; */
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 2rem;
  padding-top: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const Error = styled.div`
  margin-bottom: 0.5rem;
  color: red;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 0.3rem;
  color: gray;
  font-weight: 600;
`;

type InputProps = {
  errored?: boolean;
};
const Input = styled.input<InputProps>`
  position: relative;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background-color: #f8f8f8;
  font-size: 0.875rem;
  line-height: 1.25rem;
  /* width: 100%; */
  border-radius: 0.25rem;
  border-width: ${(props) => (props.errored ? 1 : 0)}; //0;
  border-color: ${(props) => (props.errored ? "red" : "gray")}; //red;
  outline: 0;
  /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
  ::placeholder {
    color: gray;
  }
`;

const Select = styled.select<InputProps>`
  position: relative;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background-color: #ececec;
  font-size: 0.875rem;
  line-height: 1.25rem;
  /* width: 100%; */
  border-radius: 0.25rem;
  border-width: ${(props) => (props.errored ? 1 : 0)}; //0;
  border-color: ${(props) => (props.errored ? "red" : "gray")}; //red;
  outline: 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  ::placeholder {
    color: gray;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export default AddEditDelete;
