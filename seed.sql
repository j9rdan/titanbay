INSERT INTO funds (name, vintage_year, target_size_usd, status)
VALUES ('Titanbay Growth Fund I', 2024, 250000000.00, 'Fundraising');

INSERT INTO investors (name, investor_type, email)
VALUES ('Goldman Sachs Asset Management', 'Institution', 'investments@gsam.com');

INSERT INTO investments (investor_id, fund_id, amount_usd, investment_date)
VALUES (
  (SELECT id FROM investors WHERE email = 'investments@gsam.com'),
  (SELECT id FROM funds WHERE name = 'Titanbay Growth Fund I'),
  50000000.00,
  '2024-03-15'
);