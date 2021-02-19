import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimetableStyleProps {
  indicator?: boolean;
  background?: string;
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

interface TimetableProps {
  data: TimetableData[];
}

interface TimetableState {
  colors: { [datetime: string]: string };
  classes: { [datetime: string]: string };
}

const TimetableWrapper = styled.div`
  margin: 20px 0;
  height: 500px;
  overflow: scroll;
  background-color: #ffffff;
`;

const TimeContainer = styled.div<TimetableStyleProps>`
  margin: 0;
  height: ${props => (props.indicator ? '4%' : '12%')};
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  text-align: ${props => (props.indicator ? 'center' : 'left')};
`;
const DateContainer = styled.div<TimetableStyleProps>`
  margin: 0;
  width: ${props => (props.indicator ? '5%' : '19%')};
  border: 1px solid #bfbfbf;
  text-align: ${props => (props.indicator ? 'center' : 'left')};
  background-color: ${props =>
    props.background ? props.background : '#ffffff'};
`;

const TimetableText = styled.p`
  margin: 0;
  font-weight: 300;
`;

const TimetableDisplay = ({ data }: TimetableProps) => {
  const state: TimetableState = {
    colors: {},
    classes: {},
  };

  data.forEach(datum => {
    const { color, classname, datetime } = datum;
    datetime.forEach(({ date, start, end }) => {
      state.classes[`${date}-${start}`] = classname;
      for (let i = start; i < end; i++) {
        state.colors[`${date}-${i}`] = color;
      }
    });
  });

  console.log(data);
  console.log(state);

  return (
    <TimetableWrapper>
      <TimeContainer indicator id="week-indicator">
        <DateContainer indicator id="indicator-blank">
          <TimetableText></TimetableText>
        </DateContainer>
        <DateContainer id="MON-indicator">
          <TimetableText>월요일</TimetableText>
        </DateContainer>
        <DateContainer id="TUE-indicator">
          <TimetableText>화요일</TimetableText>
        </DateContainer>
        <DateContainer id="WED-indicator">
          <TimetableText>수요일</TimetableText>
        </DateContainer>
        <DateContainer id="THU-indicator">
          <TimetableText>목요일</TimetableText>
        </DateContainer>
        <DateContainer id="FRI-indicator">
          <TimetableText>금요일</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-09">
        <DateContainer indicator id="indicator-09">
          <TimetableText>09</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-09']} id="MON-09">
          <TimetableText>
            {`${state.classes['MON-09'] ? state.classes['MON-09'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-09']} id="TUE-09">
          <TimetableText>
            {`${state.classes['TUE-09'] ? state.classes['TUE-09'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-09']} id="WED-09">
          <TimetableText>
            {`${state.classes['WED-09'] ? state.classes['WED-09'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-09']} id="THU-09">
          <TimetableText>
            {`${state.classes['THU-09'] ? state.classes['THU-09'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-09']} id="FRI-09">
          <TimetableText>
            {`${state.classes['FRI-09'] ? state.classes['FRI-09'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-10">
        <DateContainer indicator id="indicator-10">
          <TimetableText>10</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-10']} id="MON-10">
          <TimetableText>
            {`${state.classes['MON-10'] ? state.classes['MON-10'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-10']} id="TUE-10">
          <TimetableText>
            {`${state.classes['TUE-10'] ? state.classes['TUE-10'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-10']} id="WED-10">
          <TimetableText>
            {`${state.classes['WED-10'] ? state.classes['WED-10'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-10']} id="THU-10">
          <TimetableText>
            {`${state.classes['THU-10'] ? state.classes['THU-10'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-10']} id="FRI-10">
          <TimetableText>
            {`${state.classes['FRI-10'] ? state.classes['FRI-10'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-11">
        <DateContainer indicator id="indicator-11">
          <TimetableText>11</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-11']} id="MON-11">
          <TimetableText>
            {`${state.classes['MON-11'] ? state.classes['MON-11'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-11']} id="TUE-11">
          <TimetableText>
            {`${state.classes['TUE-11'] ? state.classes['TUE-11'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-11']} id="WED-11">
          <TimetableText>
            {`${state.classes['WED-11'] ? state.classes['WED-11'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-11']} id="THU-11">
          <TimetableText>
            {`${state.classes['THU-11'] ? state.classes['THU-11'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-11']} id="FRI-11">
          <TimetableText>
            {`${state.classes['FRI-11'] ? state.classes['FRI-11'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-12">
        <DateContainer indicator id="indicator-12">
          <TimetableText>12</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-12']} id="MON-12">
          <TimetableText>
            {`${state.classes['MON-12'] ? state.classes['MON-12'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-12']} id="TUE-12">
          <TimetableText>
            {`${state.classes['TUE-12'] ? state.classes['TUE-12'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-12']} id="WED-12">
          <TimetableText>
            {`${state.classes['WED-12'] ? state.classes['WED-12'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-12']} id="THU-12">
          <TimetableText>
            {`${state.classes['THU-12'] ? state.classes['THU-12'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-12']} id="FRI-12">
          <TimetableText>
            {`${state.classes['FRI-12'] ? state.classes['FRI-12'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-13">
        <DateContainer indicator id="indicator-13">
          <TimetableText>13</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-13']} id="MON-13">
          <TimetableText>
            {`${state.classes['MON-13'] ? state.classes['MON-13'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-13']} id="TUE-13">
          <TimetableText>
            {`${state.classes['TUE-13'] ? state.classes['TUE-13'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-13']} id="WED-13">
          <TimetableText>
            {`${state.classes['WED-13'] ? state.classes['WED-13'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-13']} id="THU-13">
          <TimetableText>
            {`${state.classes['THU-13'] ? state.classes['THU-13'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-13']} id="FRI-13">
          <TimetableText>
            {`${state.classes['FRI-13'] ? state.classes['FRI-13'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-14">
        <DateContainer indicator id="indicator-14">
          <TimetableText>14</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-14']} id="MON-14">
          <TimetableText>
            {`${state.classes['MON-14'] ? state.classes['MON-14'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-14']} id="TUE-14">
          <TimetableText>
            {`${state.classes['TUE-14'] ? state.classes['TUE-14'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-14']} id="WED-14">
          <TimetableText>
            {`${state.classes['WED-14'] ? state.classes['WED-14'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-14']} id="THU-14">
          <TimetableText>
            {`${state.classes['THU-14'] ? state.classes['THU-14'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-14']} id="FRI-14">
          <TimetableText>
            {`${state.classes['FRI-14'] ? state.classes['FRI-14'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-15">
        <DateContainer indicator id="indicator-15">
          <TimetableText>15</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-15']} id="MON-15">
          <TimetableText>
            {`${state.classes['MON-15'] ? state.classes['MON-15'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-15']} id="TUE-15">
          <TimetableText>
            {`${state.classes['TUE-15'] ? state.classes['TUE-15'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-15']} id="WED-15">
          <TimetableText>
            {`${state.classes['WED-15'] ? state.classes['WED-15'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-15']} id="THU-15">
          <TimetableText>
            {`${state.classes['THU-15'] ? state.classes['THU-15'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-15']} id="FRI-15">
          <TimetableText>
            {`${state.classes['FRI-15'] ? state.classes['FRI-15'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-16">
        <DateContainer indicator id="indicator-16">
          <TimetableText>16</TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['MON-16']} id="MON-16">
          <TimetableText>
            {`${state.classes['MON-16'] ? state.classes['MON-16'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['TUE-16']} id="TUE-16">
          <TimetableText>
            {`${state.classes['TUE-16'] ? state.classes['TUE-16'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['WED-16']} id="WED-16">
          <TimetableText>
            {`${state.classes['WED-16'] ? state.classes['WED-16'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['THU-16']} id="THU-16">
          <TimetableText>
            {`${state.classes['THU-16'] ? state.classes['THU-16'] : ''}`}
          </TimetableText>
        </DateContainer>
        <DateContainer background={state.colors['FRI-16']} id="FRI-16">
          <TimetableText>
            {`${state.classes['FRI-16'] ? state.classes['FRI-16'] : ''}`}
          </TimetableText>
        </DateContainer>
      </TimeContainer>
    </TimetableWrapper>
  );
};

export default TimetableDisplay;
