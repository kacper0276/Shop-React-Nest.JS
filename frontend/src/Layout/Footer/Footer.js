export default function Footer() {
  return (
    <>
      <p>
        Strona wykonana przez: Kacper Renkel{" "}
        <span dangerouslySetInnerHTML={{ __html: "&copy;" }} />
      </p>
    </>
  );
}
