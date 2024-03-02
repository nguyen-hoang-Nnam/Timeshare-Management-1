import { Badge, Col, Dropdown } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SvgIcon from "src/components/SvgIcon"
import {
  setLoadingPage,
  setPaymentSuccess,
  setReceiptUrl,
} from "src/redux/payment"
import NotifyService from "src/services/NotifyService"
import ReceiptService from "src/services/ReceiptService"
import NotifyForm from "./components/NotifyForm"
import { HubConnectionBuilder } from "@microsoft/signalr"
// import Notice from "src/components/Notice"

const Notification = () => {
  const { userInfo } = useSelector(state => state?.appGlobal)
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [connection, setConnection] = useState(null)
  const [listNotify, setListNotify] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [numberOfNewNotifies, setNumberOfNewNotifies] = useState(0)

  // const [statusCreateReceipt, setStatusCreateReceipt ] = useState(undefined)

  const getListNotify = (TextSearch = "") => {
    setLoading(true)
    let params = {}
    if (TextSearch) {
      params = { TextSearch: TextSearch }
    }
    NotifyService.GetListNotify(params)
      .then(res => {
        if (res.isOk) {
          setListNotify(res?.Object)
        }
      })
      .finally(() => setLoading(false))
  }
  const getNewNotification = () => {
    NotifyService.GetNewNotification().then(res => {
      if (res.isError) return
      res?.Object?.forEach(item => {
        if (item.UserId === userInfo?.UserID) {
          setNumberOfNewNotifies(item.NumberUnseen)
        }
      })
    })
  }
  useEffect(() => {
    if (userInfo?.UserID) {
      // getNewNotification()
      // getListNotify("")
    }
  }, [userInfo])
  //process.env.REACT_APP_API_WS

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(
        `${
          window.env?.BASE_URL || process.env.REACT_APP_API_WS
        }/signalrServer?Authorization=` + encodeURIComponent(userInfo?.Token),
        {
          headers: {
            Authorization: userInfo?.Token,
          },
        },
      )
      .withAutomaticReconnect()
      .build()
    setConnection(connect)
  }, [])
  useEffect(() => {
    if (connection) {
      connection.start().catch(error => {})
      connection.on("NotifyMessage", message => {
        console.log("NotifyMessage", message)
        // if (!!message.data) {
        //   message.data.forEach(item => {
        //     if (item.userId === userInfo.UserID) {
        //       if (item.numberUnseen > 0) {
        //         // getListNotify("")
        //         // setNumberOfNewNotifies(item.numberUnseen)
        //       }
        //     }
        //   })
        // }
      })
      connection.on("KEY_NOTIFY_PAYMENT", message => {
        console.log("KEY_NOTIFY_PAYMENT", message)
        if (message.connectedStatus) {
          dispatch(setReceiptUrl(message?.data))
          dispatch(setPaymentSuccess(true))
        }
        // if (!!message.data?.IsStatus) {
        //   if (statusPay !== true) {
        //     setStatusPay(true)
        //     setDataPay(message.data?.Message)
        //   }
        // }
      })
    }
  }, [connection])

  return (
    <Dropdown
      overlay={
        <NotifyForm
          getList={textSearch => getListNotify(textSearch)}
          listNotify={listNotify}
          loading={loading}
          onClose={() => setVisible(false)}
        />
      }
      onOpenChange={setVisible}
      open={visible}
      trigger={["click"]}
    >
      <Col
        className="pointer"
        onClick={() => {
          if (numberOfNewNotifies > 0) {
            setNumberOfNewNotifies(0)
            setLoading(true)
            NotifyService.MarkAsSeen("")
              .then(res => {
                if (res.isOk) {
                  // getListNotify("")
                }
              })
              .finally(() => setLoading(false))
          }
        }}
      >
        <div className="wrap-icon">
          <Badge
            count={numberOfNewNotifies}
            overflowCount={10}
            size="small"
            className="notification_count"
          >
            <SvgIcon name="bell" />
          </Badge>
        </div>
      </Col>
    </Dropdown>
  )
}

export default Notification
