import axios from 'axios'

export const fetchRushing = () => 
    axios.get('http://localhost:8080/rushing')
        .then((response) => response.data)

