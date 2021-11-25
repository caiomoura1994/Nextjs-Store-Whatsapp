import { formatToBRL, formatToDateTime } from "brazilian-values";
import { find } from "lodash";

export const generateWhatsappText = ({
    total,
    products,
    shippigType,
    storeData,
    ...props
}) => {

    const taxDelivery = find(storeData.delivery_tax, (o) => o.title?.toLowerCase() === props?.neigbohood?.toLowerCase());
    const taxDeliveryPrice = Number(taxDelivery?.price || 0)
    const deliveryTaxText = taxDeliveryPrice === 0 ? '*ENDEREÇO NÃO LOCALIZADA*' : `Taxa de entrega: ${formatToBRL(taxDeliveryPrice)}`
    const shippigText = shippigType === "pickInStore" ? "Retirada na Loja" : deliveryTaxText;

    const formattedAddress = `${props.street}, ${props.number} - ${props.complement}
${props.neigbohood}, ${props.city}${props.uf ? `/${props.uf}` : ''}
${props.cep}`;

    const formattedProducts = products.map((product) => {
        let formattedAdditionals = '';
        if (product?.checkedAditionals?.length > 0) {
            formattedAdditionals = product?.checkedAditionals?.map((additional => `      * ${additional.description} ${additional.price}`)).join('\n');
        }
        const pizzaSizeName = product?.pizzaSizeSelected === 'LARGE' ? 'GRANDE' : 'FAMÍLIA';
        const additionalsText = formattedAdditionals ? `    - ADICIONAIS:\n${formattedAdditionals}` : ''
        const selectedFlavorsTitle = product?.selectedFlavors ? `  Sabores da Pizza *${pizzaSizeName}*:\n` : ''
        const selectedFlavorsText = product?.selectedFlavors?.map((pizzaFlavors, pIndex) => `    ${pIndex + 1}. ${pizzaFlavors.name}`).join('\n') || ''
        const obsText = product?.comment ? `*OBS: ${product?.comment}*\n` : ''
        return `*${product.quantity}x ${product.name} ${formatToBRL(product.price)}*
${obsText}${selectedFlavorsTitle}${selectedFlavorsText}${additionalsText}`;
    }).join('\n\n');
    const totalWithDelivery = Number(total) + Number(taxDeliveryPrice)

    return {
        totalWithDelivery,
        formattedAddress,
        textMessage: `*Pedido Zeki* - ${storeData.establishment_name}
       ---------------------------------------
       
       ${formattedProducts}
       
       ${deliveryTaxText === '*ENDEREÇO NÃO LOCALIZADA*' ? '' : shippigText}
       
       *Total: ${formatToBRL(totalWithDelivery)}*
       
       ---------------------------------------
       *${props.name}*
       ${props.phone}
       
       ${shippigType === "address" ? formattedAddress : ""}
       
       ${props.thing ? `Troco para: ${props.thing}` : ""}
       ${props.paymentMethod === 'pix' ? 'Pagamento via Pix' : ""}
       ${props.paymentMethod === 'creditCard' ? 'Pagamento via Cartão' : ''}
       
       ${deliveryTaxText === '*ENDEREÇO NÃO LOCALIZADA*' && shippigType !== "pickInStore" ? `Quanto fica o frete para esse endereço ?` : ''}
       ${shippigType === "pickInStore" ? 'Retirada na Loja, Pedido confirmado ?\nEm quanto tempo posso ir buscar ?' : ''}
       
       Pedido gerado pelo Zeki às ${formatToDateTime(new Date())}`
    }
};