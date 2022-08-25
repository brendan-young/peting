# Peting
Peting is a web based application that allows people to review their most loved (or unloved) toys that they have bought for their pets... but with a twist. Using Peting you create a user account, and within that account you can create profiles for you pets. You then review toys under the persona of your pet, describing how much the toy was enjoyed, the longevity of the toy, any favourite things about the toy etc. 

This application was created as I felt there was a gap in the market for pet toy reivews to be easily accessible in a single place. Websites like PetCircle.com allow users to review products on their webpage, but there are some critical information and fields that I think would help visitors decide what toy to buy next for their beloved pet. As a dog owner myself, I am always on the hunt for a new toy to buy for my Groodle, Nyxon. Looking at reviews of pet toys via e-commerce pet stores I realised that lots of people like to mention what breed (especially dogs) their type of pet is - so I took this a step further, and allow a user to create a profile of their pet, and log a review under that persona. 

## User Stories
I looked at users from 2 different angles:
1. The perspective of a visitor of the site looking to understand a good toy to buy their pet
2. The perspective of a login user of the site that can create their pets and review toys 

A couple examples of user stories are as follows:
<br>
**Visitor** <br>
*“As a visitor I would like to see, at a glance, whether the reviewers recommend the toy or if they would purchase it again”*

**Login User** <br>
*"As a user with an accounts I would like to be able to create a profile of my pet, and review my pets favourite toy"*

## Wireframes
Wireframes for 'Peting' were created using Figma.com. 

![alt text](https://res.cloudinary.com/dtfpk4gbd/image/upload/v1661467130/Screen_Shot_2022-08-26_at_8.36.15_am_curikq.png)
![alt text](https://res.cloudinary.com/dtfpk4gbd/image/upload/v1661467129/Screen_Shot_2022-08-26_at_8.36.47_am_h21z7i.png)
![alt text](https://res.cloudinary.com/dtfpk4gbd/image/upload/v1661467129/Screen_Shot_2022-08-26_at_8.36.37_am_rmswva.png)
![alt text](https://res.cloudinary.com/dtfpk4gbd/image/upload/v1661467129/Screen_Shot_2022-08-26_at_8.36.27_am_qrilhv.png)

Wireframes were created holisically for the entire application and each relevant page - you can view the Figma wireframes __[HERE](https://www.figma.com/file/vIRoKV6LB5ikU2VwftUdHF/Project-4---Wireframes?node-id=0%3A1)__

## ERD
![alt text](https://res.cloudinary.com/dtfpk4gbd/image/upload/v1661469874/Capstone_Project_ERD_bpf0kk.jpg)
## Technologies
### Backend 
* Language: Python
* PostgreSQL
* Flask 
* Cloudinary
* Psycopg2

### Frontend
* ReactJS 
* React - Bootstrap

## Challenges
The biggest challenge I faced was simply time available. In layman's terms "I bit off more than I could chew" with this application. If I had a couple more days I think I would have been able to complete CRUD functionality for toy reviews, but unfortunately due to time restraints I was only able to complete CRUD functionality for users and their pets. On a positive note, I was able to build my understanding of React data flow to a much higher level than where I was prior to coming into this project. I believe this was a double edged sword as I had a vision for what the final application would look like, so I designed my postgreSQL database to that vision, however building front-end functionality took longer than I anticipated. 
<br>
<br>
A particular bug I spent quite some time on was while using ```useParams();``` - ```useParams();``` was pulling my id's out as a string, which meant when I passed state as props into child components the state was not passing. This was fixed by converting the string id into a number using the ```Number()``` method. 
<br>
<br>

## Future Functionality - to do next!
There is a lot left in this project that I would like to complete in order to achieve my MVP vision.
1. CRUD for toy reviews - inclusive of radio buttons for toy 'longevity', 'rating', & 'enjoyment'
2. Verify deletion of pets & reviews with a confirmation modal
3. Add the type of animal the pet is to the database and allow visitors and users to filter toys by animal type
4. Search functionality for keywords 
5. Filter functionality for highest rated toys with keywords e.g dog toys, highest rated from high -> low
6.  Comment section for toys on top of reviews
