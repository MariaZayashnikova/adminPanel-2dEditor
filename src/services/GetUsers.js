const GetUser = async () => {
    let res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!res.ok) {
        throw new Error(`Ошбика: Статус: ${res.status}`);
    }

    return await res.json();
}

export default GetUser;