import React, { useState, useEffect } from "react";
import Item from "./Item";

const ItemList = ({ items }) => {
    const [fetchedItems, setFetchedItems] = useState([]);
    const [error, setError] = useState(null);

    const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URI);
                if (!response.ok) {
                    throw new Error("Failed to fetch items");
                }
                const data = await response.json();
                setFetchedItems(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URI}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }

            setFetchedItems(fetchedItems.filter(item => item.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {fetchedItems.length === 0 ? (
                <p>No items available</p>
            ) : (
                fetchedItems.map((item) => (
                    <Item key={item.id} item={item} deleteItem={handleDelete} />
                ))
            )}
        </>
    );
};

export default ItemList;