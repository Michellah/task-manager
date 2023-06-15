import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns"
/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/

// calculate time differene
const calculateTimeDifference = (server: Date, client: Date) => {
  const differenceTimes = Math.abs(server.getTime() - client.getTime())

  const days =  Math.floor(differenceTimes / (1000 * 60 *60 *24));
  const hours = Math.floor((differenceTimes % (1000 * 60 * 60 *24)) / (1000 * 60 * 60 ));
  const minutes = Math.floor((differenceTimes % (1000 * 60 * 60 )) / (1000 * 60 ));
  const seconds = Math.floor((differenceTimes % (1000 * 60 )) / 1000)

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
};

// Server side rendering
export async function getServerSideProps() {
  const serverTime = new Date();
  const clientTime = new Date();
  const formattedServerTime = format(serverTime, "dd-MM-yyyy HH:mm");

  const differenceTime = calculateTimeDifference(serverTime, clientTime);

  return {
    props: {
      serverTime: formattedServerTime,
      differenceTime,
    },
  };

}

export default function Home({serverTime, differenceTime}: any) {

  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime"> {serverTime} </span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{differenceTime}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
