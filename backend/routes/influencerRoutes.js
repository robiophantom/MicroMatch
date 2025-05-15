const express = require('express');
const router = express.Router();
const { 
  verifyInstagram, 
  registerInfluencer, 
  getInfluencerProfile, 
  updateInfluencerProfile, 
  verifyInfluencerProfile,
  getEligibleCampaigns,
  acceptCampaign,
  submitCampaignStory,
  validateCampaignManually
} = require('../controllers/influencerControllers');
const auth = require('../middleware/auth');
const influencerOnly = require('../middleware/influencerMiddleware');

// Public routes
router.get('/verify-instagram', verifyInstagram);
router.post('/register', registerInfluencer);

// Protected routes - require authentication
router.get('/:id', auth, getInfluencerProfile);
router.put('/:id', auth, updateInfluencerProfile);
router.post('/:id/verify', auth, verifyInfluencerProfile);

// Protected routes - require influencer role
router.get('/:id/campaigns/eligible', auth, influencerOnly, getEligibleCampaigns);
router.post('/:influencerId/campaigns/:campaignId/accept', auth, influencerOnly, acceptCampaign);
router.post('/:influencerId/campaigns/:campaignId/submit', auth, influencerOnly, submitCampaignStory);
router.post('/:influencerId/campaigns/:campaignId/validate', auth, influencerOnly, validateCampaignManually);

module.exports = router;