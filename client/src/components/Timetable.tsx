import React, { useState } from 'react';
import { FormInstance } from 'antd/lib/form';
import TimetableDisplay from './TimetableDisplay';
import TimetableForm from './TimetableForm';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers';
import { apiRequest } from '../actions/actions';

type Date = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

interface FormValues {
  classname: string;
  date: Date;
  startTime: string;
  endTime: string;
}

interface TimetableDateTime {
  date: string;
  start: number;
  end: number;
}

interface TimetableData {
  color: string;
  classname: string;
  datetime: TimetableDateTime[];
}

const colors = [
  '#ff4d4f',
  '#fff566',
  '#bae637',
  '#36cfc9',
  '#40a9ff',
  '#b37feb',
  '#ff85c0',
  '#ff9c6e',
  '#8c8c8c',
];

const Timetable = () => {
  const dispatch = useDispatch();

  const [timetableData, setTimetableData] = useState<TimetableData[]>([]);

  const [dateList, setDateList] = useState<Date[]>([]);
  const [startTimeList, setStartTimeList] = useState<number[]>([]);
  const [endTimeList, setEndTimeList] = useState<number[]>([]);
  const userPreference = useSelector((state: AppState) => state.userPreference);

  const handleSingleSubmit = (form: FormInstance) => (values: FormValues) => {
    const { classname, date, startTime, endTime } = values;

    const newData = [...timetableData];
    const idx = timetableData.findIndex(datum => datum.classname === classname);
    if (idx >= 0) {
      newData[idx].datetime.push({
        date,
        start: parseInt(startTime, 10),
        end: parseInt(endTime, 10),
      });
    } else {
      newData.push({
        color: colors[newData.length],
        classname,
        datetime: [
          {
            date,
            start: parseInt(startTime, 10),
            end: parseInt(endTime, 10),
          },
        ],
      });
    }

    setTimetableData(newData);

    setDateList([...dateList, date]);
    setStartTimeList([...startTimeList, parseInt(startTime, 10)]);
    setEndTimeList([...endTimeList, parseInt(endTime, 10)]);

    form.resetFields();
  };

  const handleFinalSubmit = (event: React.MouseEvent) => {
    const requestBody = {
      ...userPreference,
      date_lst: dateList,
      start_lst: startTimeList,
      end_lst: endTimeList,
      credit: userPreference.credit - 3 * timetableData.length,
    };
    dispatch(apiRequest(timetableData, requestBody));
  };

  return (
    <div>
      <TimetableForm handleSubmit={handleSingleSubmit} />
      <TimetableDisplay data={timetableData} />
      <Button type="primary" htmlType="button" onClick={handleFinalSubmit}>
        시간표 최종 전송!
      </Button>
    </div>
  );
};

export default Timetable;
