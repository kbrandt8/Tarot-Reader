
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import { CgCardHearts } from "react-icons/cg";
import { CarouselItem } from 'react-bootstrap';


export default function Home() {

  return (
    <main>
      <h1>Welcome to Tarot-Reader!</h1>
      <h3>What kind of reading are you looking for today?</h3>

      <Carousel
        variant="dark"
        indicators={false}
        pause='hover'
        keyboard
        wrap={true}
        touch={true}
      >




        <CarouselItem>
          <Link href={`/readings/OneCardReading`}>

            <h1>One Card Reading</h1>
            <div className="showCardsStart"><CgCardHearts /></div>


            <p>Just a one card summary reading.</p>

          </Link>


        </CarouselItem>


        <CarouselItem>

          <Link href={`/readings/ThreeCardReading`}>

            <h1>Three Card Reading</h1>
            <div className="showCardsStart"><CgCardHearts /><CgCardHearts /><CgCardHearts /></div>
            <p>Past Present Future reading.</p>

          </Link>
        </CarouselItem>
        <CarouselItem>

          <Link href={`/readings/FourCardReading`}>

            <h1>Four Card Reading</h1>
            <div className="showCardsStart"><CgCardHearts /><CgCardHearts /><CgCardHearts /><CgCardHearts /></div>
            <p>Best for Yes/No Questions</p>

          </Link>

        </CarouselItem>
        <CarouselItem>
          <Link href={`/readings/CelticCrossReading`}>

            <h1>Celtic Cross Reading</h1>

            <div className="showCardsStart"><CgCardHearts /><CgCardHearts /><CgCardHearts /><CgCardHearts /><CgCardHearts /><CgCardHearts /></div>
            <div className="showCardsStart"><CgCardHearts /><CgCardHearts /><CgCardHearts /><CgCardHearts /><CgCardHearts /></div>
            <p>Get a Full look at Your situation with a Celtic Cross Reading.</p>

          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link href={`/readings/TodaysCard`} >
            <h1>Todays Card</h1>
            <div className="showCardsStart"><CgCardHearts /></div>
            <p>Your card of the day according to numerology.</p>

          </Link>
        </CarouselItem>

      </Carousel>

    </main >
  )
}
