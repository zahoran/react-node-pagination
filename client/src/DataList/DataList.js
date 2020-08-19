import React, {useEffect, useState} from "react"
import axios from 'axios'
import Pagination from "react-js-pagination"
import baseUrl from "../config"

const DataList = () => {
    const [list, setList] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [totalItems, setTotalItems] = useState(1)
    useEffect(() => {
        getItems()
    }, [])
    const getItems = (skip) => {
        let url = '/tasks';
        if (skip) {
            url += '?skip=' + skip;
        }
        axios.get(url).then(
            response => {
                setList(response.data.tasks)
                setTotalItems(response.data.total)
                setActivePage(!skip ? 1 : (skip + 3) / 3)
            }
        )
    }
    return (
        <div className="">
            {list.map((item, i) => {
                return <p key={i}>{item.description}</p>
            })}
            <Pagination
                activePage={activePage}
                itemsCountPerPage={3}
                totalItemsCount={totalItems}
                itemClass="page-item"
                linkClass="page-link"
                innerClass="pagination justify-content-center"
                pageRangeDisplayed={5}
                onChange={(data) => getItems(3 * (data - 1))}
            />
        </div>
    )
}

export default DataList