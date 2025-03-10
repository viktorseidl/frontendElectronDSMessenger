# REACT ELECTRON MEDICARE MESSENGER APPLICATION

## Description

The MEDICARE software is a comprehensive solution for residential care facilities, developed by DATA Schafhausen GmbH. It offers specialized modules for administration, care documentation, and staff scheduling. The goal is to reduce administrative and documentation workloads while streamlining care processes.

This React-Electron application is designed to replace the current messenger of the Medicare application in the future and facilitate the migration of Medicare to a cloud-based version over the course of the year.

Thanks to the ICP handler, the messenger can be launched either as a standalone application or within the existing Medicare app.

In addition to the previous version, a file explorer has been integrated, allowing users to search for files independently without having to browse through each message manually.

Due to its cross-platform compatibility, the application is automatically available for Windows, macOS, and Linux.

### Screens

| LOGIN                                            | INBOX                                             |
| ------------------------------------------------ | ------------------------------------------------- |
| <img style="width:80%;" src="./src/Screen1.png"> | <img style="width:80%;" src="./src/Screen2.png">  |
| FILE EXPLORER                                    | NEW MESSAGE                                       |
| <img style="width:80%;" src="./src/Screen3.png"> | <img style="width:80%;" src="./src/Screen4.png">  |
| LIGHT MODE                                       | INBOX LIGHT MODE                                  |
| <img style="width:80%;" src="./src/Screen5.png"> | <img style="width:80%;" src="./src/Screen6.png">  |
| CALENDAR DAILY                                   | CALENDAR WEEKLY                                   |
| <img style="width:80%;" src="./src/Screen7.png"> | <img style="width:80%;" src="./src/Screen8.png">  |
| CALENDAR MONTHLY                                 | CALENDAR YEARLY                                   |
| <img style="width:80%;" src="./src/Screen9.png"> | <img style="width:80%;" src="./src/Screen10.png"> |

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
