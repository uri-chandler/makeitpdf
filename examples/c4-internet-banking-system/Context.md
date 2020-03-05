<div style="page-break-after:always"></div>

## Context View

Our online banking system should allow our users to:
- View their account information online
- Perform banking actions such as trasnferring funds and trading
- Receive email notifications for different key information


```plantuml
    @startuml
    skinparam Monochrome true
    skinparam defaultFontColor Grey
    skinparam defaultFontName Noteworthy

    Title \nOnline Banking System\n

    rectangle User [
        **User**

        - A customer of the bank
        - Wants to use online banking
    ]

    rectangle Bank [
        **Online Banking System**

        - Customers can view account status
        - Customers can transfer funds
        - Customers can update account settings
    ]

    rectangle Email [
        **Existing Email System**

        - Sends marketing informations
        - Sends status notices, account statements
    ]

    database Mainframe [

        **Existing Mainframe DB**
        <MySQL>

        - Holds the all the bank records

    ]


    User -down->  Bank      :Interacts with the system
    Bank -down->  Email     :Sends notifications
    Bank -right-> Mainframe :Reads & Writes banking records \n [SQL]

    @enduml
```