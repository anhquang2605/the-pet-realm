1. {} in typescript means that it is any value that is not null. try not to use them to define an empty object
2. to define empty prop type: type LogoutPageProps = Record<string, never>;