class FreelancersController < ApplicationController

    def index
        @freelancers = Freelancer.all  
        render json: @freelancers      
    end

    def show
        @freelancer = Freelancer.find_by(id: params[:id])
        if @freelancer
            render json: @freelancer
        else
            render json: {error: "Freelancer not found"}, status: 404
        end
    end

    def new

    end

    def create
        @freelancer = Freelancer.new(freelancer_params)
        if @freelancer.save
            render json: @freelancer
        else
            render json: {error: "Unable to create freelancer."}, status: 400
        end         
    end

    private

    def freelancer_params
        params.require(:freelancer).permit(:name, :username, :password)
    end
    
end
