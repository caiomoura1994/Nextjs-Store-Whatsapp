import { formatToBRL, formatToDateTime } from "brazilian-values";

export const generateWhatsappText = ({
    total,
    products,
    ...props
}) => {
    const formattedAddress = `${props.street}, ${props.number} - ${props.complement}
${props.neigbohood}, ${props.city}/${props.uf}
${props.cep}`;

    const formattedProducts = products.map((product) => {
        let formattedAdditionals = '';
        if (product.checkedAditionals) {
            formattedAdditionals = product.checkedAditionals.map((additional => ` ${additional.title} ${additional.price}`));
        }
        return `*${product.quantity}x ${product.name} ${formatToBRL(product.price)}*
        - ${formattedAdditionals}
        `;
    });

    return `*Pedido Zapei #0001* - Pastello Pizzaria & Pastelaria
---------------------------------------

${formattedProducts}

*Total: ${total}*

---------------------------------------
*${props.name}*
${props.phone}

${formattedAddress}

Pedido gerado pelo Zapei às ${formatToDateTime(new Date())}
    `
};