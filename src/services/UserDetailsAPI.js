export function callUserDetailsAPI(name) {

    return fetch(
        `http://localhost:8080/userDetails?customerId=${name}`
    ).then((data) => data.json());
}