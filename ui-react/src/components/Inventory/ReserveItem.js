// RESERVE ITEM FORM
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, deleteItem } from '../../redux/actions/warehouseActions';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ReserveItem = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return(
        <div>
            <h2>Reserve Item</h2>
            <form>
                <input placeholder="work in progress" />
                <Calendar />
            </form>
        </div>
    )
};

export default ReserveItem;