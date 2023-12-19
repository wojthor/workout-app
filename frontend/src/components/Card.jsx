import Card from "react-bootstrap/Card";

function CardExample({ workouts, user }) {
  /* Joining date */
  const date = new Date(user.dateOfRegistration);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day < 10 ? "0" : ""}${day}.${
    month < 10 ? "0" : ""
  }${month}.${year}`;

  /* Last workout */
  const dates = workouts.map((workout) => workout.date);
  dates.sort((a, b) => new Date(b) - new Date(a));
  const latestWorkout = dates[0];

  /* Number of training sessions */
  const workoutsNumber = workouts.length;

  return (
    <div className="d-flex gap-2 flex-wrap ">
      <Card border="dark" className="bg-dark" style={{ width: "18rem" }}>
        <Card.Header className="text-light">Joining date</Card.Header>
        <Card.Body className="d-flex justify-content-center">
          <Card.Title className="text-light"></Card.Title>
          <Card.Text className="text-light ">
            <h1>{formattedDate}</h1>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card border="dark" className="bg-dark" style={{ width: "18rem" }}>
        <Card.Header className="text-light">
          Number of training sessions
        </Card.Header>
        <Card.Body className="d-flex justify-content-center">
          <Card.Title className="text-light"></Card.Title>
          <Card.Text className="text-light ">
            {workoutsNumber ? (
              <h1>{workoutsNumber}</h1>
            ) : (
              <h6 className="align-items-center mt-4">
                You have not set any workouts
              </h6>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card border="dark" className="bg-dark" style={{ width: "18rem" }}>
        <Card.Header className="text-light">Last workout</Card.Header>
        <Card.Body className="d-flex justify-content-center">
          <Card.Text className="text-light ">
            {latestWorkout ? (
              <h1>
                {new Date(latestWorkout).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h1>
            ) : (
              <h6 className="align-items-center mt-4">
                You have not set any workouts
              </h6>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
}

export default CardExample;
