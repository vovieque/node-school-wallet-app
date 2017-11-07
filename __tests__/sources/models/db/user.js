const sinon = require('sinon');
const User = require('../../../../source/models/db/user');

let sandbox = null;
beforeEach(() => { sandbox = sinon.sandbox.create(); });
afterEach(() => { sandbox.restore(); });

describe('User.getNextId', () => {
    it('should work without existing collection', async () => {
        sandbox.stub(User, 'findOne').callsFake(() => {
            return {
                sort: () => ({
                    exec: () => null
                })
            }
        });
        const userId = await User.getNextId();
        expect(userId).toBe(1);
    });
    it('should return last user id added by one', async () => {
        sandbox.stub(User, 'findOne').callsFake(() => {
            return {
                sort: () => ({
                    exec: () => ({
                        id: 1
                    })
                })
            }
        });
        const userId = await User.getNextId();
        expect(userId).toBe(2);
    });
    it('should throw when id is too big', async () => {
        sandbox.stub(User, 'findOne').callsFake(() => {
            return {
                sort: () => ({
                    exec: () => ({
                        id: Number.MAX_SAFE_INTEGER
                    })
                })
            }
        });
        try {
            const id = await User.getNextId();
        }
        catch(e) {
            expect(e.toString()).toEqual("Error: Unable to get next id. Max user id exceed");
            return;
        }
        expect(true).toBeFalsy();
    });
});