import { formatToBRL, formatToDateTime } from "brazilian-values";

export const generateWhatsappText = ({
    total,
    products,
    shippigType,
    storeData,
    ...props
}) => {
    const shippigText = shippigType === "pickInStore" ? "Retirada na Loja" : "Quanto fica o frete para esse endereço ?";

    const formattedAddress = `${props.street}, ${props.number} - ${props.complement}
${props.neigbohood}, ${props.city}/${props.uf}
${props.cep}`;

    const formattedProducts = products.map((product) => {
        let formattedAdditionals = '';
        if (product?.checkedAditionals?.length > 0) {
            formattedAdditionals = product?.checkedAditionals?.map((additional => ` ${additional.title} ${additional.price}`));
        }
        return `*${product.quantity}x ${product.name} ${formatToBRL(product.price)}*
        ${formattedAdditionals && `- ${formattedAdditionals}`}
        `;
    });

    return `*Pedido Zeki* - ${storeData.establishment_name}
---------------------------------------

${formattedProducts}

*Total: ${total}*

---------------------------------------
*${props.name}*
${props.phone}

${shippigType === "address" ? formattedAddress : ""}

${props.thing ? `Troco para: ${props.thing}` : ""}
${props.paymentMethod === 'pix' ? 'Pagamento via Pix' : ""}
${props.paymentMethod === 'creditCard' && 'Pagamento via Cartão'}


${shippigText}


Pedido gerado pelo Zeki às ${formatToDateTime(new Date())}
    `
};