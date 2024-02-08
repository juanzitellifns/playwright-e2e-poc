export class TestAuthManager {
  private accessToken: string | null = null;
  private static instance: TestAuthManager | null = null;

  private constructor() { }

  public static async getInstance(): Promise<TestAuthManager> {
    if (!TestAuthManager.instance) {
      TestAuthManager.instance = new TestAuthManager();
      await TestAuthManager.instance.setAccessToken();
    }
    return TestAuthManager.instance;
  }

  public getAccessToken() {
    return this.accessToken;
  }

  private async setAccessToken() {
    const res = await fetch(`${process.env['AUTH0_ISSUER_URL']}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env['AUTH0_BASIC_AUTH_SECRET']}`,
      },
      body: JSON.stringify({
        client_id: process.env['AUTH0_CLIENT_ID'],
        client_secret: process.env['AUTH0_CLIENT_SECRET'],
        audience: process.env['AUTH0_AUDIENCE'],
        grant_type: 'client_credentials',
      }),
      credentials: 'include',
    });

    const data = await res.json();

    const token = data.access_token;

    if (token) this.accessToken = token;
  }
}
