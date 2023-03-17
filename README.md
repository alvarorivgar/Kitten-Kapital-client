# Kitten Kapital

<br>

## Description

This is an banking app that lets users manage their saving and transfer funds to other people

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can contact a bank manager to create my user and first bank account
-  **Login:** As a user I can login to the platform so that I can manage my accounts
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Add accounts** As a user I can add new accounts to manage my funds
-  **Delete accounts** As a user I can all accounts created by me
-  **Check accounts** As a user I can check the details of my accounts and see their movements
-  **Edit profile** As a user I can change my profile picture, email, and password
-  **Transfer money** As a user I can transfer money to other accounts
-  **Create users** As an admin I can create new users
-  **Create accounts** As an admin I can create new accounts for users
-  **Search users** As an admin I can search any user
-  **My clients** As an admin I can see a list of users created by me to manage my clients
-  **Delete users** As an admin I can delete users


## Backlog

- Savings accounts with interest rates
- Penalty fees for accounts below the minimum balance
- Credit cards
- Improve video call functionality

<br>


# Client / Frontend

## React Router Routes (React App)
| Path                          | Component                      | Behavior                                                             |
| ----------------------------- | --------------------------  | ----------------------------------------------------------------------- |
| `/`                           | HomeAnon                    | Anon home page                                                          |
| `/login`                      | Login                       | Login form, navigate to homepage after login                            |
| `/logout`                     | n/a                         | Navigate to homepage after logout, expire session                       |
| `/user`                       | HomeLogged                  | Home page, see account list, link to add account                        |
| `/admin/create-admin`         | CreateAdminForm             | Create form, video call, navigate to login after admin creation         |
| `/admin/create-user`          | CreateUserForm, VideoCall   | Create form, video call, navigate to create account after user creation |
| `/admin/user-search`          | SearchUsers, SearchUserForm | Filter user list                                                        |
| `/admin/user-details/:userId` | UserDetails                 | See user details and user accounts                                      |
| `/admin/my-clients`           | MyClients                   | See list of users created by logged admin                               |
| `/user/profile`               | Profile                     | Check profile with stat information and edit                            |
| `/user/:accountId/details`    | AccountDetails              | See account details, movements, add money, delete account               |
| `/create-account/:userId`     | CreateAccountForm           | Create a new account                                                    |
| `/transaction/create`         | CreateTransferForm          | Transfer money to another account                                       |
| `/video`                      | VideoCall                   | Anon user calls a manager to become a client                            |

          

## Components

- Login
- HomeAnon
- HomeLogged
- Profile
- VideoCall
- MyClients
- SearchUsers
- UserDetails
- Error
- NotFound
- ChangeEmail
- ChangeImage
- ChangePassword
- CreateAccountForm
- CreateAdminForm
- CreateUserForm
- IsPrivate
- Navbar
- SearchUserForm

 

## Services

- Auth Service
  - loginService(user)
  - verifyService()

- Admin Service
  - createAdminService(admin)
  - createUserService(user)
  - getAllUsersService()
  - getAllMyClientsService()
  - deleteUserService(userId)

- User Service
  - getUserService(userId)
  - editUserEmailService(userId, newEmail)
  - editUserPasswordService(userId, newPassword1, newPassword2)
  - editUserImageService(userId, newImage)

- Checking Service
  - createCheckingAccountService(userId, checkingAccount)
  - getCheckingAccountsService(userId)
  - getSingleCheckingAccountDetailsService(accountId)
  - deleteCheckingAccountService(accountId)
  - addMoneyCheckingService(accountId, moneyToAdd)

- Kitty Service
   - createKittyAccountService(userId, checkingAccount)
  - getKittyAccountsService(userId)
  - getSingleKittyAccountDetailsService(accountId)
  - deleteKittyAccountService(accountId)
  - addMoneyKittyService(accountId, moneyToAdd)

- Transfer Service
  - createTransactionService(newTransfer)
  - transferService(newTransfer)
  - getAccountTransactionsService(accountId)

- Upload Service
  - uploadImageService(imageFile)


<br>


# Server / Backend


## Models

User model

```javascript
{
  firstName: {type: String, required: true, trim: true},
  lastName: {type: String, required: true, trim: true},
  idNumber: {type: String, required: true, unique: true, lowercase: true},
  dob: {type: Date, required: true}
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  password: {type: String, required: true},
  role: {type: String, enum: ["user", "kitty"]},
  image: {type: String, default: "https://res.cloudinary.com/dkz1jslyi/image/upload/v1677055585/Plannerly/blank-profile-picture-973460_1280-1-705x705_zz7gvv.png"},
  manager: {type: Schema.Types.ObjectId, ref: "Admin"}
  },
}
```



Admin model

```javascript
 {
   idNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
        type: String,
        default: "admin"
    },
    fullName: {
      type: String,
      required: true
    }
 }
```

Checking Account model

```javascript 
{
accountName: {
      type: String,
      trim: true,
      default: "Checking account",
    },
    balance: {
      type: Number,
      default: 0, // Value is counted in cents
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    transferFee: {
      type: Number,
      default: 500,
    },
    maintenanceFee: {
      type: Number,
      default: 200,
    },
    minimumBalance: {
      type: Number,
      default: 500,
    },
    penaltyFee: {
      type: Number,
      default: 100,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      refPath: "model_type",
      model_type: {
        type: String,
        enum: ["User", "Admin"],
      }
    }
}   
```

Kitty Account model

```javascript 
{
 accountName: {
      type: String,
      trim: true,
      default: "Kitty account",
    },
    balance: {
      type: Number,
      default: 0, // Value is counted in cents
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
}   
```

Transaction model

```javascript 
{
  origin: {
      type: Schema.Types.ObjectId,
      refPath: "model_type",
      model_type: {
        type: String,
        enum: ["CheckingAccount", "KittyAccount"],
      },
    },
    destination: {
      type: Schema.Types.ObjectId,
      refPath: "model_type",
      model_type: {
        type: String,
        enum: ["CheckingAccount", "KittyAccount"],
      },
    },
    amount: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      trim: true,
    },
}   
```


<br>


## API Endpoints (backend routes)




<br>


## Links


### Git


[Client repository Link](https://github.com/alvarorivgar/Kitten-Kapital-client)

[Server repository Link](https://github.com/alvarorivgar/Kitten-Kapital-server)

[Deployed App Link](https://kitten-kapital.netlify.app/)

### Slides


[Slides Link](https://docs.google.com/presentation/d/1A8hynfFZdQUscH_C9fAyvVC9HY2uWgb4Gq9FlFcoT5I/edit?usp=sharing)