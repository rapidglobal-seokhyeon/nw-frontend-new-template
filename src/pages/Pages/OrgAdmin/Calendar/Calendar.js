import React from "react";
import { Card, CardBody, Container, Col } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import BootstrapTheme from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import SimpleBar from "simplebar-react";
import UpcommingEvents from "./UpcommingEvents";

const defaultevent = [
  {
    id: 1,
    title: "World Braille Day",
    start: "2022-01-01T00:00:00.000Z",
    end: "2022-01-08T00:00:00.000",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },
  {
    id: 2,
    title: "World Leprosy Day",
    start: "2022-05-04",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 3,
    title: "International Mother Language Day",
    start: "2022-02-21",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 4,
    title: "International Women's Day",
    start: "2022-03-08",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 5,
    title: "World Thinking Day",
    start: "2022-02-22",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 6,
    title: "International Mother Language Day",
    start: "2022-03-21",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 7,
    title: "World Water Day",
    start: "2022-03-22",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 8,
    title: "World Health Day",
    start: "2022-04-07",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 9,
    title: "International Special Librarians Day",
    start: "2022-04-16",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },

  {
    id: 10,
    title: "Earth Day",
    start: "2022-04-22",
    className: "bg-info-subtle text-info",
    allDay: true,
    description: "N.A.",
    location: "N.A.",
  },
];

const Calendar = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div style={{display: "flex"}}>
            <Col xl={9}>
              <Card className="card-h-100">
                <CardBody>
                  <FullCalendar
                    plugins={[
                      BootstrapTheme,
                      dayGridPlugin,
                      interactionPlugin,
                      listPlugin,
                    ]}
                    initialView="dayGridMonth"
                    slotDuration={"00:15:00"}
                    handleWindowResize={true}
                    themeSystem="bootstrap"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,dayGridWeek,dayGridDay,listWeek",
                    }}
                    // events={events}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    // dateClick={handleDateClick}
                    // eventClick={handleEventClick}
                    // drop={onDrop}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xl={3} className="ml-4">
              <Card className="card-h-80">
                <CardBody>
                  <h5 className="mb-10 flex">Upcoming Events</h5>
                  <p className="text-muted">Don't miss scheduled events</p>
                  <SimpleBar className="pe-2 me-n1 mb-3 h-100">
                    <div id="upcoming-event-list">
                      {defaultevent &&
                        defaultevent.map((event, key) => (
                          <React.Fragment key={key}>
                            <UpcommingEvents event={event} />
                          </React.Fragment>
                        ))}
                    </div>
                  </SimpleBar>
                </CardBody>
              </Card>
            </Col>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Calendar;
