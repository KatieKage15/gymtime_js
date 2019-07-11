Client.destroy_all
Instructor.destroy_all

instructor1 = Instructor.create(name: "Katie", bio: "I specialize in Strength Training. Let's get you strong!")
isntructor2 = Instructor.create(name: "Lauren", bio: "Cardio is a great way to burn fat! I have been a spin instructor for 5 years!")
instructor3 = Instructor.create(name: "Rosie", bio: "I teach gymnastics and barre. Come and try it out!")



Client.create(name: "Lea", age: 54, goals: "I need to tone up for a tough mudder.", instructor: instructor1)
Client.create(name: "Jamie", age: 35, goals: "I'd like to put on muscle.", instructor: instructor1)
Client.create(name: "Steven", age: 27, goals: "I want to lose 20 pounds.", instructor: instructor2)
Client.create(name: "Ashlee", age: 34, goals: "Help me lose my extra fat!", instructor: instructor2)
Client.create(name: "William", age: 19, goals: "I really need help with my flexibility.",instructor: instructor3)
Client.create(name: "Sarah", age: 22, goals: "I want to learn how to do a handstand.",instructor: instructor3)
