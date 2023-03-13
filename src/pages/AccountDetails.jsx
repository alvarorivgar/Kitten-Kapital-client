import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function AccountDetails() {

    const { accountId} = useParams()
    const [account, setAccount] = useState(null)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            // const foundAccount = 
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>AccountDetails</div>
  )
}

export default AccountDetails