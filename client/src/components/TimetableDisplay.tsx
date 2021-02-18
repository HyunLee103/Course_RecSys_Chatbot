import React from 'react';
import styled from 'styled-components';

interface TimetableStyleProps {
  indicator?: boolean;
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
`;

const TimetableText = styled.p`
  margin: 0;
  font-weight: 300;
`;

const TimetableDisplay: React.FC = () => {
  return (
    <TimetableWrapper>
      <TimeContainer indicator id="week-indicator">
        <DateContainer indicator id="indicator-blank">
          <TimetableText></TimetableText>
        </DateContainer>
        <DateContainer id="mon-indicator">
          <TimetableText>월요일</TimetableText>
        </DateContainer>
        <DateContainer id="tue-indicator">
          <TimetableText>화요일</TimetableText>
        </DateContainer>
        <DateContainer id="wed-indicator">
          <TimetableText>수요일</TimetableText>
        </DateContainer>
        <DateContainer id="thu-indicator">
          <TimetableText>목요일</TimetableText>
        </DateContainer>
        <DateContainer id="fri-indicator">
          <TimetableText>금요일</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-09">
        <DateContainer indicator id="indicator-09">
          <TimetableText>09</TimetableText>
        </DateContainer>
        <DateContainer id="mon-09">
          <TimetableText>월요일 9시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-09">
          <TimetableText>화요일 9시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-09">
          <TimetableText>수요일 9시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-09">
          <TimetableText>목요일 9시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-09">
          <TimetableText>금요일 9시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-10">
        <DateContainer indicator id="indicator-10">
          <TimetableText>10</TimetableText>
        </DateContainer>
        <DateContainer id="mon-10">
          <TimetableText>월요일 10시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-10">
          <TimetableText>화요일 10시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-10">
          <TimetableText>수요일 10시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-10">
          <TimetableText>목요일 10시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-10">
          <TimetableText>금요일 10시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-11">
        <DateContainer indicator id="indicator-11">
          <TimetableText>11</TimetableText>
        </DateContainer>
        <DateContainer id="mon-11">
          <TimetableText>월요일 11시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-11">
          <TimetableText>화요일 11시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-11">
          <TimetableText>수요일 11시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-11">
          <TimetableText>목요일 11시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-11">
          <TimetableText>금요일 11시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-12">
        <DateContainer indicator id="indicator-12">
          <TimetableText>12</TimetableText>
        </DateContainer>
        <DateContainer id="mon-12">
          <TimetableText>월요일 12시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-12">
          <TimetableText>화요일 12시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-12">
          <TimetableText>수요일 12시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-12">
          <TimetableText>목요일 12시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-12">
          <TimetableText>금요일 12시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-13">
        <DateContainer indicator id="indicator-13">
          <TimetableText>13</TimetableText>
        </DateContainer>
        <DateContainer id="mon-13">
          <TimetableText>월요일 13시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-13">
          <TimetableText>화요일 13시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-13">
          <TimetableText>수요일 13시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-13">
          <TimetableText>목요일 13시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-13">
          <TimetableText>금요일 13시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-14">
        <DateContainer indicator id="indicator-14">
          <TimetableText>14</TimetableText>
        </DateContainer>
        <DateContainer id="mon-14">
          <TimetableText>월요일 14시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-14">
          <TimetableText>화요일 14시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-14">
          <TimetableText>수요일 14시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-14">
          <TimetableText>목요일 14시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-14">
          <TimetableText>금요일 14시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-15">
        <DateContainer indicator id="indicator-15">
          <TimetableText>15</TimetableText>
        </DateContainer>
        <DateContainer id="mon-15">
          <TimetableText>월요일 15시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-15">
          <TimetableText>화요일 15시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-15">
          <TimetableText>수요일 15시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-15">
          <TimetableText>목요일 15시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-15">
          <TimetableText>금요일 15시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
      <TimeContainer id="week-16">
        <DateContainer indicator id="indicator-16">
          <TimetableText>16</TimetableText>
        </DateContainer>
        <DateContainer id="mon-16">
          <TimetableText>월요일 16시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="tue-16">
          <TimetableText>화요일 16시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="wed-16">
          <TimetableText>수요일 16시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="thu-16">
          <TimetableText>목요일 16시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
        <DateContainer id="fri-16">
          <TimetableText>금요일 16시</TimetableText>
          <TimetableText>수업</TimetableText>
        </DateContainer>
      </TimeContainer>
    </TimetableWrapper>
  );
};

export default TimetableDisplay;
