class BidsController < ApplicationController
    before_action :set_bids, only: [:show, :update, :destroy, :take]

  # GET /bids
  def index
    @bids = Bid.all
    render json: @bids
  end

  # GET /bids
  def show
    render json: @bids
  end

  # POST /bids
  def create
    @bids = Bid.new(bid_params)
    @bids.state = "open"
    if @bids.save
      render json: @bids, status: :created
    else
      render json: @bids.errors, status: :unprocessable_entity
    end
  end

  def take
    @bids.state = "closed"
    @bids.bidder = params.require(:bidder)
    if @bids.save
      render json: @bids, status: :created
    else
      render json: @bids.errors, status: :unprocessable_entity
    end
  end  

  def filter
    user = params[:id]
    @bids = []
    filter = params.required(:filter)
    puts "filter:" + filter
    puts "user:" + user
    if filter == "all"
        @bids = Bid.where.not(owner: user)
    end    
    if filter == "bidded"
        @bids = Bid.where(bidder: user)
    end    
    if filter == "own"
        @bids = Bid.where(owner: user)
    end
    render json:  @bids 

  end


  # PUT /bids/1
  def update
    if @bids.update(bid_params)
      render json: @bids
    else
      render json: @bids.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bids/1
  def destroy
    @bids.destroy
  end

  private

  def set_bids
    @bids = Bid.find(params[:id])
  end

  def bid_params
    params.require(:bids).permit(:owner, :amount, :publication, :state, :contact, :kind)
  end
end
