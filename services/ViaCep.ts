import ApiService from "./ApiService";

type ErrorInterface = { erro: boolean; }
interface ViaCepInterface extends ErrorInterface {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

class ViaCepApi extends ApiService {
    async get(cep: string): Promise<Partial<ViaCepInterface>> {
        const viacepUrl = `https://viacep.com.br/ws/${cep}/json/`;
        const { data } = await this.service.get(viacepUrl);
        return data
    }
}

export default new ViaCepApi;
