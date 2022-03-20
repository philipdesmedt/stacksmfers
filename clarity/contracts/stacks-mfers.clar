;; stacks-mfers

;; (impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait)
(impl-trait .nft-trait.nft-trait)

(define-non-fungible-token stacks-mfers uint)

;; Constants
(define-constant DEPLOYER tx-sender)
(define-constant COMM u100000)
(define-constant COMM-ADDR-ONE 'SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG)

(define-constant ERR-NO-MORE-NFTS u100)
(define-constant ERR-NOT-ENOUGH-PASSES u101)
(define-constant ERR-PUBLIC-SALE-DISABLED u102)
(define-constant ERR-CONTRACT-INITIALIZED u103)
(define-constant ERR-NOT-AUTHORIZED u104)
(define-constant ERR-INVALID-USER u105)
(define-constant ERR-LISTING u106)
(define-constant ERR-WRONG-COMMISSION u107)
(define-constant ERR-NOT-FOUND u108)
(define-constant ERR-PAUSED u109)
(define-constant ERR-MINT-LIMIT u110)
(define-constant ERR-METADATA-FROZEN u111)
(define-constant ERR-AIRDROP-CALLED u112)
(define-constant ERR-NO-MORE-MINTS u113)

;; Internal variables
(define-data-var mint-limit uint u4269)
(define-data-var last-id uint u1)
(define-data-var total-price uint u6900000)
(define-data-var artist-address principal 'SP2N3BAG4GBF8NHRPH6AY4YYH1SP6NK5TGCY7RDFA)
(define-data-var ipfs-root (string-ascii 80) "ipfs://QmaejQXudVNHxyubms1jiSs6gRNUukPbM4Yj4WWLGwesKN/")
(define-data-var mint-paused bool false)
(define-data-var premint-enabled bool false)
(define-data-var sale-enabled bool false)
(define-data-var metadata-frozen bool false)
(define-data-var airdrop-called bool false)
(define-data-var mint-cap uint u0)

(define-map mints-per-user principal uint)
(define-map mint-passes principal uint)

(define-public (claim)
  (mint (list true))
)

(define-public (claim-five)
  (begin
    (try! (mint (list true true true true true)))
    (mint-many (list true) false)
  )
)

(define-public (claim-ten)
  (begin
    (try! (mint (list true true true true true true true true true true)))
    (mint-many (list true true true) false)
  )
)

(define-public (claim-twenty-five)
  (begin
    (asserts! (var-get sale-enabled) (err ERR-PUBLIC-SALE-DISABLED))
    (try! (mint (list true true true true true true true true true true true true true true true true true true true true true true true true true)))
    (mint-many (list true true true true true true true true true true) false)
  )
)

;; Mintpass Minting
(define-private (mint (orders (list 25 bool)))
  (let (
    (passes (get-passes tx-sender))
  )
    (if (var-get premint-enabled)
      (begin
        (asserts! (>= passes (len orders)) (err ERR-NOT-ENOUGH-PASSES))
        (asserts! (<= (var-get last-id) u3579) (err ERR-NO-MORE-NFTS))
        (map-set mint-passes tx-sender (- passes (len orders)))
        (mint-many orders true)
      )
      (begin
        (asserts! (var-get sale-enabled) (err ERR-PUBLIC-SALE-DISABLED))
        (mint-many orders true)
      )
    )
  )
)

(define-private (mint-many (orders (list 25 bool )) (paid bool))
  (let (
    (last-nft-id (var-get last-id))
    (enabled (asserts! (<= last-nft-id (var-get mint-limit)) (err ERR-NO-MORE-NFTS)))
    (art-addr (var-get artist-address))
    (id-reached (fold mint-many-iter orders last-nft-id))
    (price (* (var-get total-price) (- id-reached last-nft-id)))
    (current-balance (get-balance tx-sender))
    (total-artist (- price COMM))
    (capped (> (var-get mint-cap) u0))
    (user-mints (get-mints tx-sender))
  )
    (asserts! (or (not (var-get mint-paused)) (is-eq tx-sender DEPLOYER)) (err ERR-PAUSED))
    (asserts! (or (not capped) (is-eq tx-sender DEPLOYER) (is-eq tx-sender art-addr) (>= (var-get mint-cap) (+ (len orders) user-mints))) (err ERR-NO-MORE-MINTS))
    (map-set mints-per-user tx-sender (+ (len orders) user-mints))
    (if (or (is-eq tx-sender art-addr) (is-eq tx-sender DEPLOYER) (is-eq (var-get total-price) u0000000))
      (begin
        (var-set last-id id-reached)
        (map-set token-count tx-sender (+ current-balance (- id-reached last-nft-id)))
      )
      (begin
        (var-set last-id id-reached)
        (map-set token-count tx-sender (+ current-balance (- id-reached last-nft-id)))
        (if paid
          (begin
            (try! (stx-transfer? total-artist tx-sender (var-get artist-address)))
            (try! (stx-transfer? COMM tx-sender COMM-ADDR-ONE))
          )
          true
        )
      )
    )
    (ok id-reached)
  )
)

(define-private (mint-many-iter (ignore bool) (next-id uint))
  (if (<= next-id (var-get mint-limit))
    (begin
      (unwrap! (nft-mint? stacks-mfers next-id tx-sender) next-id)
      (+ next-id u1)
    )
    next-id
  )
)

(define-public (set-artist-address (address principal))
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-INVALID-USER))
    (ok (var-set artist-address address))
  )
)

(define-public (set-price (price uint))
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-INVALID-USER))
    (ok (var-set total-price price))
  )
)

(define-public (toggle-pause)
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-INVALID-USER))
    (ok (var-set mint-paused (not (var-get mint-paused))))
  )
)

(define-public (set-mint-limit (limit uint))
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-INVALID-USER))
    (asserts! (< limit (var-get mint-limit)) (err ERR-MINT-LIMIT))
    (ok (var-set mint-limit limit))))

(define-public (burn (token-id uint))
  (begin 
    (asserts! (is-owner token-id tx-sender) (err ERR-NOT-AUTHORIZED))
    (nft-burn? stacks-mfers token-id tx-sender)))

(define-private (is-owner (token-id uint) (user principal))
    (is-eq user (unwrap! (nft-get-owner? stacks-mfers token-id) false)))

(define-public (set-base-uri (new-base-uri (string-ascii 80)))
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))
    (asserts! (not (var-get metadata-frozen)) (err ERR-METADATA-FROZEN))
    (var-set ipfs-root new-base-uri)
    (ok true)))

(define-public (freeze-metadata)
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))
    (var-set metadata-frozen true)
    (ok true)))

;; Non-custodial SIP-009 transfer function
(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err ERR-NOT-AUTHORIZED))
    (asserts! (is-none (map-get? market id)) (err ERR-LISTING))
    (trnsfr id sender recipient)))

;; read-only functions
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? stacks-mfers token-id)))

(define-read-only (get-last-token-id)
  (ok (- (var-get last-id) u1)))

(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat (concat (var-get ipfs-root) "{id}") ".json"))))

(define-read-only (get-paused)
  (ok (var-get mint-paused)))

(define-read-only (get-price)
  (ok (var-get total-price)))

(define-read-only (get-mints (caller principal))
  (default-to u0 (map-get? mints-per-user caller)))

(define-read-only (get-mint-limit)
  (ok (var-get mint-limit)))

;; Non-custodial marketplace extras
(define-trait commission-trait
  ((pay (uint uint) (response bool uint))))

(define-map token-count principal uint)
(define-map market uint {price: uint, commission: principal})

(define-read-only (get-balance (account principal))
  (default-to u0
    (map-get? token-count account)))

(define-private (trnsfr (id uint) (sender principal) (recipient principal))
  (match (nft-transfer? stacks-mfers id sender recipient)
    success
      (let
        ((sender-balance (get-balance sender))
        (recipient-balance (get-balance recipient)))
          (map-set token-count
            sender
            (- sender-balance u1))
          (map-set token-count
            recipient
            (+ recipient-balance u1))
          (ok success))
    error (err error)))

(define-private (is-sender-owner (id uint))
  (let ((owner (unwrap! (nft-get-owner? stacks-mfers id) false)))
    (or (is-eq tx-sender owner) (is-eq contract-caller owner))))

(define-read-only (get-listing-in-ustx (id uint))
  (map-get? market id))

(define-public (list-in-ustx (id uint) (price uint) (comm-trait <commission-trait>))
  (let ((listing  {price: price, commission: (contract-of comm-trait)}))
    (asserts! (is-sender-owner id) (err ERR-NOT-AUTHORIZED))
    (map-set market id listing)
    (print (merge listing {a: "list-in-ustx", id: id}))
    (ok true)))

(define-public (unlist-in-ustx (id uint))
  (begin
    (asserts! (is-sender-owner id) (err ERR-NOT-AUTHORIZED))
    (map-delete market id)
    (print {a: "unlist-in-ustx", id: id})
    (ok true)))

(define-public (buy-in-ustx (id uint) (comm-trait <commission-trait>))
  (let ((owner (unwrap! (nft-get-owner? stacks-mfers id) (err ERR-NOT-FOUND)))
      (listing (unwrap! (map-get? market id) (err ERR-LISTING)))
      (price (get price listing)))
    (asserts! (is-eq (contract-of comm-trait) (get commission listing)) (err ERR-WRONG-COMMISSION))
    (try! (stx-transfer? price tx-sender owner))
    (try! (contract-call? comm-trait pay id price))
    (try! (trnsfr id owner tx-sender))
    (map-delete market id)
    (print {a: "buy-in-ustx", id: id})
    (ok true)))

;; Extra functionality required for mintpass
(define-public (toggle-sale-state)
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))
    (var-set premint-enabled false)
    (var-set sale-enabled (not (var-get sale-enabled)))
    (ok true)
  )
)

(define-public (enable-premint)
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))
    (ok (var-set premint-enabled true))
  )
)

(define-public (disable-premint)
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))
    (ok (var-set premint-enabled false))
  )
)

(define-read-only (get-passes (caller principal))
  (default-to u0 (map-get? mint-passes caller))
)

(define-public (add-passes (recipient { caller: principal, amount: uint }))
  (let (
    (passes (get-passes (get caller recipient)))
  )
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))
    (map-set mint-passes (get caller recipient) (+ passes (get amount recipient)))
    (ok true)
  )
)

(define-public (bulk-add-passes (recipients (list 200 { caller: principal, amount: uint })))
  (begin
    (asserts! (or (is-eq tx-sender (var-get artist-address)) (is-eq tx-sender DEPLOYER)) (err ERR-NOT-AUTHORIZED))

    (map add-passes recipients)
    (ok true)
  )
)

(define-read-only (get-premint-enabled)
  (ok (var-get premint-enabled))
)

(define-read-only (get-sale-enabled)
  (ok (var-get sale-enabled))
)


(map-set mint-passes 'ST5FG2V1D2965WPD9552SHR9YK27HRWB1S5YNACT u100) ;; TODO - remove for mainnet
(map-set mint-passes 'SP3VCX5NFQ8VCHFS9M6N40ZJNVTRT4HZ62WFH5C4Q u100)
