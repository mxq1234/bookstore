import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function NavigateTo(path, state){
    const navigate = useNavigate();
    navigate(path, state);
}
