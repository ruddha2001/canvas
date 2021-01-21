export default function SignInButton() {
  return (
    <p className={['inline'].join(' ')}>
      Login and take a step towards self-analysis
      <a href="/api/user/login">
        <img className={['block', 'w-52', 'md:w-60', 'self-center', 'm-auto'].join(' ')} src="/google_btn.png" />
      </a>
    </p>
  );
}
