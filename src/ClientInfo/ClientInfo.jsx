import { useForm } from "react-hook-form";
import "./ClientInfo.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useHookFormMask } from "use-mask-input";

const url = "https://sycret.ru/service/api/api";
const apiKey = "011ba11bdcad4fa396660c2ec447ef14";

export default function ClientInfo(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const registerWithMask = useHookFormMask(register);

  const onSubmit = (data) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ApiKey: apiKey,
        MethodName: "OSSale",
        Id: props.buyProduct.ID,
        TableName: props.buyProduct.TABLENAME,
        PrimaryKey: props.buyProduct.PRIMARYKEY,
        Price: props.buyProduct.PRICE,
        Summa: props.buyProduct.SUMMA,
        ClientName: data.name,
        Phone: data.phone.replace(/\W|_/g, "").slice(1),
        Email: data.email,
        PaymentTypeId: 2,
        UseDelivery: 0,
        IsGift: 0,
        MsgText: data.message,
      }),
    }).catch(() => console.log("Error"));
    navigate("/Payment");
  };
  if (Object.keys(props.buyProduct).length === 0) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="listInfo">
      <h1 className="nameInfoList">ИНФОРМАЦИЯ О КЛИЕНТЕ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className=" form">
        <div className="inputs">
          <h2 className="productName">{props.buyProduct.NAME}</h2>
          <label>Имя</label>
          <input
            id="name"
            placeholder="Светлана"
            {...register("name", {
              required: "Это поле обязательно для заполнения",
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <label>Телефон</label>
          <input
            id="phone"
            placeholder="+7 (___) ___-__-__"
            {...registerWithMask("phone", "+7 (999) 999-99-99", {
              required: "Это поле обязательно для заполнения",
              pattern: {
                value: /^([+]?[0-9\s-()]{7,10})*$/i,
                message: "Некоректный формат ввода",
              },
            })}
          ></input>
          {errors.phone && <p className="error">{errors.phone.message}</p>}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="sveta.devyatkina.99@mail.ru"
            {...register("email", {
              required: "Это поле обязательно для заполнения",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Некоректный формат ввода",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
          <label>Сообщение</label>
          <textarea
            type="text"
            height="50px"
            id="message"
            placeholder="Сообщение..."
            {...register("message")}
          />
        </div>
        <div className="buttons">
          <button
            onClick={() => navigate("/")}
            className="btn active"
            type="button"
          >
            Назад
          </button>
          <button className="btn active" type="submit">
            Перейти к оплате
          </button>
        </div>
      </form>
    </div>
  );
}
