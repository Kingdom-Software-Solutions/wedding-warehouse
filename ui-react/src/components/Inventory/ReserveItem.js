// RESERVE ITEM FORM
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem, deleteItem } from '../../redux/actions/warehouseActions';
import Calendar from 'react-calendar';

const ReserveItem = () => {
    return(
        <div>
            <h2>Reserve Item</h2>
            <form>
                <input placeholder="work in progress" />
            </form>
        </div>
    )
};

export default ReserveItem;