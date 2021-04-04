import Input from "./ui/Input"


export default function ShippingForm() {
  return (
    <form style={{ margin: "0 2rem 1rem" }}>
      <Input id="cep" label="CEP" />
      <Input id="street" label="Rua/Av" />
      <Input id="neigbohood" label="Bairro" />
      <Input id="number" label="Número" />
      <Input id="complement" label="Complemento" />
      <Input id="city" label="Cidade" />
    </form>
  )
}