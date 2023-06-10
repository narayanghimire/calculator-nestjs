import { DecryptService } from "@app/calculator/src/services/decrypt.service";

describe('DecryptService', () => {
  let service: DecryptService;
  beforeEach(() => {
    service = new DecryptService();
  });

  describe('decrypt', () => {
    it('should call the decrypt method of the decrypter with the provided encoded string', () => {
      const buffer = Buffer.from('2+3-(3*9)/12', 'utf-8');
      const encodedString = buffer.toString('base64');  // "MitDKzMtKDMqOSkvMTI="
      const decryptedString = '2+3-(3*9)/12';
      const result = service.decrypt(encodedString);
      expect(result).toBe(decryptedString);
    });
  });
});
