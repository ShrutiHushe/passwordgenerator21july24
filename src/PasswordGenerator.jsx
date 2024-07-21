import {useState, useRef, useEffect} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from "validator";

export default function PasswordGenerator() {
  const rLength = useRef();

  const [length, setLength] = useState("");
  const [uppercase, setUppercase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");

	const hLength = (event) => {setLength(event.target.value); }
	const hUppercase = (event) => {setUppercase(event.target.checked); }
	const hDigits= (event) => {setDigits(event.target.checked); }
	const hSpecial = (event) => {setSpecial(event.target.checked); }

  useEffect(() => {
    document.body.style.backgroundColor = "lightblue";
  }, []);

  const show = (event) =>
  {
	event.preventDefault();
	if(length === "")
	{
		alert("u did not enter length of the password");
		rLength.current.focus();
		navigator.clipboard.writeText("");
		setPassword("");

		return;
	}

	const btnName = event.nativeEvent.submitter.name;
	
	if(btnName === "sub")
	{
		let text = "abcdefghijklmnopqrstuvwxyz";
		if(uppercase)
			text = text + text.toUpperCase();
		if(digits)
			text = text + "0123456789";
		if(special)
			text = text + "!@#$%^&*()";
		let pw = "";
		let len = parseInt(length);
		for(let i=1; i<= len; i++)
		{
			let r = parseInt(Math.random() * text.length);
			pw = pw + text[r];
		}
		setPassword(pw);
	}
	else if(btnName === "ctc")
	{
		if(password != "")
		{
			navigator.clipboard.writeText(password);
			toast.success("copied to clipboard",
			{
				autoClose:1000,
				position: "top-center",
				theme: "dark",
			});

		}

	}
	else if(btnName === "ps")
	{
		const sp = {minLength:8, minLowerCase:1, minUpperCase:1, minNumbers:1, minSymbols:2}
		if(validator.isStrongPassword(password, sp))
			toast.success("strong");
		else
			toast.success("weak");
	}
  }

  return (
    <center>
      <ToastContainer/>
      <h1> Password Generator </h1>
      <form onSubmit={show}>
	<label> Enter Password length </label>
        <input type="number" min={8} max={20} onChange={hLength} ref={rLength} value={length}/>
        <br /><br />
        <input type="checkbox" onChange={hUppercase} />Uppercase
        <input type="checkbox" onChange={hDigits} />Digits
        <input type="checkbox" onChange={hSpecial} />Special Characters
        <br /><br />
        <input type="submit" name="sub" class="btn"/>
        <input type="submit" value = "Copy to Clipboard" name="ctc" class="btn"/>
        <input type="submit" value = "Password Strength" name="ps" class="btn"/>
      </form>
	<h2> {password} </h2>
    </center>
  );
}

