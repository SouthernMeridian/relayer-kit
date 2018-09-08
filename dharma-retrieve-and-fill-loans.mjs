import fetch from "node-fetch";
import Dharma from "@dharmaprotocol/dharma.js";

const dharma = new Dharma("http://localhost:8545");
const { LoanRequest } = Dharma.Types;

// Constants
const CREDITOR_ADDRESS = "0x....";
const RELAYER_API_URL = "http://localhost:8000";

function retrieveDebtOrders() {
    return new Promise((resolve, reject) => {
        fetch(`${RELAYER_API_URL}/v0/debt_orders`)
            .then(response => resolve(response.json()))
            .catch(reason => reject(reason));
    });
}

retrieveDebtOrders().then(async response => {
    const debtOrders = response.debtOrders;

    const debtOrder = debtOrders[0].debtOrder;

    const loanRequest = LoanRequest.load(dharma, debtOrder);

    await loanRequest.fillAsCreditor(CREDITOR_ADDRESS);
});
