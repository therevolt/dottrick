import "./App.css";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [copy, setCopy] = useState(false);
  const [btnCopy, setBtnCopy] = useState(false);
  let text = "";

  const dotTrick = (username) => {
    function* generate(username) {
      if (username.length <= 1) {
        yield username;
      } else {
        let head = username[0];
        let tail = username.slice(1);
        for (let item of generate(tail)) {
          yield head + item;
          yield head + "." + item;
        }
      }
    }
    const user = username.toLowerCase();
    let arr = [];
    for (let items of generate(user)) {
      arr.push(`${items}@gmail.com`);
    }
    setData(arr);
  };

  const onClick = () => {
    dotTrick(user);
    setBtnCopy(!btnCopy);
  };

  const onChange = (e) => {
    setUser(e.target.value);
    console.log(data);
  };

  return (
    <div>
      <Container style={{ marginBottom: "20px" }}>
        <span className="textHead">D.O.T TRICK GENERATOR</span>
        <br />
        <span className="textBody">
          Butuh Waktu Beberapa Detik Hingga Menit Untuk Memproses, Harap Sabar Dan Tunggu!
        </span>
      </Container>
      <Container>
        <InputGroup className="mb-3" onChange={onChange}>
          <FormControl
            placeholder="ketik username tanpa @gmail.com"
            aria-label="ketik username"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Button variant="light" onClick={onClick}>
          Dot Trick Now!
        </Button>{" "}
        {btnCopy && (
          <Button
            variant="info"
            onClick={async () => {
              text.select();
              document.execCommand("copy");
              setCopy(!copy);
              setBtnCopy(!btnCopy);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }}
          >
            Copy Result
          </Button>
        )}{" "}
        {copy && <span>Success Copy Result!</span>}
        {data.length > 0 ? (
          <InputGroup style={{ color: "black", marginTop: "18px", height: "350px" }}>
            <InputGroup.Prepend>
              <InputGroup.Text>Result ({data.length})</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={data.join("\n")}
              ref={(textarea) => (text = textarea)}
            />
          </InputGroup>
        ) : (
          <div style={{ height: "400px" }}></div>
        )}
      </Container>
      <footer style={{ textAlign: "center" }}>Build With ❤️ By TheRevolt</footer>
    </div>
  );
}

export default App;
