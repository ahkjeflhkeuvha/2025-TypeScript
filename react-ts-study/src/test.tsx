import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

type MyContainerProps = {
    title: string,
    width: number,
    children: ReactNode
}

type User = {
    id: number,
    name: string,
    email: string
}

type UserDataFetcherType = {
    id: number;
    render: (data: User | null, loading: boolean) => React.ReactNode
}

function UserDataFetcher({id, render} : UserDataFetcherType) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('http error')
            } 
            return response.json() as Promise<User>;
        })
        .then(data => {
            setUser(data)
        })
        .finally(() => {
            setLoading(false)
        })
    },[])

    return render(user, loading)
}

function MyContainer({ title, width, children } : MyContainerProps) {
    return (
        <div style={{
            width,
            border: "1px solid black",
            borderRadius: "8px",
            margin: "16px 0"
        }}>
            <UserDataFetcher id={1} render={(data: User | null, loading: boolean) => {
                return <div>
                    {
                        // loading  && data ? "로딩중" : (data !== null) ? <p>{data!.email}</p> : ""
                        data === null && loading ? "로딩중" : <p>{data.email}</p>
                    }
                </div>
            }} />
            <h1> {title }</h1>
            <div>{children}</div>
        </div>
    )

}
function App() {
    return (
        <div>
            <MyContainer title="기본정보" width={500}> 책</MyContainer>
            <MyContainer title="기본정보" width={200}> 책2</MyContainer>
        </div>
    )
}

createRoot(document.getElementById('root')!).render(<App />)