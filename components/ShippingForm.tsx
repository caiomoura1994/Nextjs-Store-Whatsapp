import Input from "./ui/Input"
import { UseFormReturn } from "react-hook-form";

type ShippingFormType = {
  formContext: UseFormReturn;
  onSubmit?: () => void;
}
export default function ShippingForm({ formContext, onSubmit }: ShippingFormType) {
  const { register, handleSubmit, watch } = formContext;

  const [
    street,
    city,
    neigbohood
  ] = watch([
    'street',
    'city',
    'neigbohood'
  ])
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "0 2rem 1rem" }}>
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <Input {...register("cep")} id="cep" label="CEP*" />
      <Input value={street} {...register("street")} id="street" label="Rua/Av*" />
      <Input value={city} {...register("city")} id="city" label="Cidade*" />
      <Input value={neigbohood} {...register("neigbohood")} id="neigbohood" label="Bairro*" />
      <Input {...register("complement")} id="complement" label="Complemento" />
      <Input {...register("number")} id="number" label="Número*" />
    </form>
  )
}