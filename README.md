
<table>
  <tr>
      <td>  <img width="700" height="300" alt="Screenshot (70)" src="https://github.com/user-attachments/assets/f36cf8dc-e865-401d-b55c-5596227ac4cf" /> </td>
      <td> <img width="188" height="338" alt="image" src="https://github.com/user-attachments/assets/ba92fd46-28ef-4836-8f62-1ab9bf25a82c" /> </td>
  </tr>
</table>

### Launch: https://split-the-bill-jet.vercel.app/



# Split The Bill
This project is a responsive complex bill splitting web application built with **React and TailwindCSS**. 

## Problem Scenario
We often run into situations where shared bills are more complicated than paying half-half or simply dividing the entire bill by the number of people, especially when eating out in groups. For example consider this scenario:

Eating in a group of 5:
  - The dinner bill was **3785 Birr**
  - You had **2000** in cash so you offered that 
  - While your friend pays the rest with the cash he had.

Questions that quickly arise
- How much does everyone else owe you?
- how much does everyone owe that friend?

**To take the scenario further**: what if everyone didn't consume equally? maybe one friend only had coffee (unequal split).

Another common scenario is group trips or tours, where one person pays for transportation, another covers lunch, and a third handles accommodation or entrance fees.

Luckily, you don't have to know or do multivariable algebra or type all this into an LLM. This is the exact problem this web app solves.

## Responsive Design
<table>
  <tr>
    <th>Tablet</th>
    <th>Mobile</th>
  </tr>
  <tr>
    <td>
      <img width="287" height="343" alt="image" src="https://github.com/user-attachments/assets/361bbfe8-45c4-4c70-b7bf-e8439a1b00f8" />
    </td>
    <td>
     <img width="191" height="340" alt="image" src="https://github.com/user-attachments/assets/df3644a2-073d-4f98-9fcb-fd1ea0b09d5f" />
     </td>
  </tr>
</table>






## Features

- Equal bill splitting with a **single payer**
- Equal bill splitting with **multiple payers**
- Unequal bill splitting with a **single payer**
- Unequal bill splitting with **multiple payers**
- Clear balance breakdown showing:
  - How much each member owes
  - To whom they owe it
  - How much each member has lent
