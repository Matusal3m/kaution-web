const baseUrl = process.env.BASE_API_URL;

type Token = string;
console.log({ baseUrl });
async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Token | undefined> {
  try {
    console.log("Enviando dados de login...");
    const response = await fetch(`${baseUrl}/auth/login`, {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token } = await response.json();

    console.log({ token });

    localStorage.setItem("jwt", token);

    return token;
  } catch (error) {
    console.log({ error });
    return undefined;
  }
}

async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<Token | undefined> {
  try {
    const response = await fetch(`${baseUrl}/auth/register`, {
      body: JSON.stringify({
        email,
        password,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { token } = await response.json();

    localStorage.setItem("jwt", token);

    return token;
  } catch (error) {
    console.log({ error });
    return undefined;
  }
}

// Precisa de mais verificação
// Solicitar troca -> mandar token de autenticação para a troca OU código de verificação -> enviar senha nova
async function changePassword(code: number): Promise<void> {
  try {
    const response = await fetch(`${baseUrl}/auth/verify-confirmation-code`, {
      body: JSON.stringify({
        code,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log({ error });
    return undefined;
  }
}

async function sendConfirmationCode(email: string): Promise<void> {
  try {
    const response = await fetch(`${baseUrl}/auth/confirmation-code`, {
      body: JSON.stringify({
        email,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log({ error });
    return undefined;
  }
}

async function verifyConfirmationCode(code: number): Promise<void> {
  try {
    const response = await fetch(`${baseUrl}/auth/verify-confirmation-code`, {
      body: JSON.stringify({
        code,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log({ error });
    return undefined;
  }
}

export {
  login,
  register,
  sendConfirmationCode,
  verifyConfirmationCode,
  changePassword,
};
