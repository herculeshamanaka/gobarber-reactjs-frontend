import React, { useState, useCallback } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  const handleDateChanged = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setSelectedDate(day);
      }
    },
    [],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Welcome, </span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Scheduled Appointments</h1>
          <p>
            <span>Today</span>
            <span>Day 06</span>
            <span>Monday</span>
          </p>

          <NextAppointment>
            <strong>Next appointment</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/48022589?s=400&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
                alt="Laura Beatriz"
              />
              <strong>Laura Beatriz</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Morning</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/48022589?s=400&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
                  alt="Laura Beatriz"
                />
                <strong>Laura Beatriz</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Afternoon</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/48022589?s=400&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
                  alt="Laura Beatriz"
                />
                <strong>Laura Beatriz</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/48022589?s=400&u=6e0093b40a2ad5e8384ca214ee835859d03ebe2e&v=4"
                  alt="Laura Beatriz"
                />
                <strong>Laura Beatriz</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            selectedDays={selectedDate}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChanged}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
