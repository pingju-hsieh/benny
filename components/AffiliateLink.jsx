export default function AffiliateLink({ href, children, className = '', ...props }) {
  // SEO 保護：nofollow + sponsored
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

