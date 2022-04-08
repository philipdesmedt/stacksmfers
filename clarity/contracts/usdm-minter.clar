;; Mint and Burn USDM

;; @desc mints an amount of USDM.
;; 1 USDM is minted by burning $1 of MFER
;; @param amount; amount of USDM to be minted with 6 decimals
;; @post bool; returns try if success
(define-public (mint (amount uint))
  (let (
    (dollar-price-mfer u1000000) ;; TODO - define source of USD price of 1 $MFER. Hard-coded to $1 now (1 x 10^6)
    (mfer-tokens-needed (/ amount dollar-price-mfer))
  )
    (try! (contract-call? .mfer-token burn mfer-tokens-needed tx-sender))
    (try! (contract-call? .usdm-token mint amount tx-sender))

    (ok true)
  )
)

;; @desc burns an amount of USDM.
;; 1 USDM is burned by minting $1 of MFER
;; @param amount; amount of USDM to be burned with 6 decimals
;; @post bool; returns try if success
(define-public (burn (amount uint))
  (let (
    (dollar-price-mfer u1000000) ;; TODO - define source of USD price of 1 $MFER. Hard-coded to $1 now (1 x 10^6)
    (mfer-tokens-needed (/ amount dollar-price-mfer))
  )
    (try! (contract-call? .usdm-token burn amount tx-sender))
    (try! (contract-call? .mfer-token mint mfer-tokens-needed tx-sender))

    (ok true)
  )
)
