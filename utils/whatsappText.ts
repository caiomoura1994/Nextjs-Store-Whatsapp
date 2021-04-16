import { formatToBRL, formatToDateTime } from "brazilian-values";

export const generateWhatsappText = ({
    name,
    phone,
    total,
    cep,
    city,
    complement,
    neigbohood,
    number,
    street,
    uf,
    products
}) => {
    const formattedAddress = `${street}, ${number} - ${complement}
${neigbohood}, ${city}/${uf}
${cep}`;

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
*${name}*
${phone}

${formattedAddress}

Pedido gerado pelo Zapei às ${formatToDateTime(new Date())}
    `
};