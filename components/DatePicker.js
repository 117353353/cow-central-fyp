import React, { useState} from "react"
import { TouchableOpacity } from "react-native"
import { Input } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'
import {formatDate } from "../helpers"
// https://github.com/react-native-datetimepicker/datetimepicker
function DatePicker({date, setDate, label}) {
    const [show, setShow] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate)
    }

    return (
        <>
            <TouchableOpacity onPress={() => setShow(true)}>
                <Input label={label ? label : "Date"} value={formatDate(date)} disabled/>
            </TouchableOpacity>

            {show &&
            <DateTimePicker // date time picker code acquired here: https://github.com/react-native-datetimepicker/datetimepicker
                value={date}
                mode={"date"}
                display="default"
                onChange={onChange}
            />}
        </>
    )
}

export default DatePicker